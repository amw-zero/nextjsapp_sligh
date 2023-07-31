entity Counter:
    name: String
    value: Int
end

process CounterProc:
    counters: Set(Counter)

    def Get():
        counters
    end

    def Create(counter: Counter):
        counters := counters.append(counter)
    end

    def Increment(name: String):
        def findCounter(counter: Counter):
            counter.name.equalsStr(name)
        end

        def updateCounter(counter: Counter):
            Counter.new(counter.name, counter.value + 1)
        end

        counters := counters.update(findCounter, updateCounter)
    end 
end